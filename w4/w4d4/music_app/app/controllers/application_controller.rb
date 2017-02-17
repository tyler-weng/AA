class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  class Entry

    attr_reader :title, :link

    def initialize(title, link)
      @title = title
      @link = link
    end

  end
  # 
  # def self.retrieve_tweets!
  #   require 'twitter'
  #
  #   @client = Twitter::REST::Client.new do |config|
  #     config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
  #     config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
  #     config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
  #     config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
  #   end
  #
  #   @client.user_timeline("realDonaldTrump")
  # end

  def scrape_reddit
    require 'open-uri'
    require 'nokogiri'
    doc = Nokogiri::HTML(open("https://www.reddit.com/r/The_Donald/"))

    entries = doc.css('.entry')
    @entries_arr = []
    entries.each do |entry|
      title = entry.css('p.title>a').text
      link = entry.css('p.title>a')[0]['href']
      @entries_arr << Entry.new(title, link)
    end

    render template: 'scrape_reddit'
  end

  private



  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def log_in_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def log_out_user!(user)
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_user!
    redirect_to new_session_url unless current_user
  end
end
