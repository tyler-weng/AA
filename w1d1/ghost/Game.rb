require_relative 'Player'
require 'set'

class Game

  attr_accessor :fragment
  def initialize(dictionary, players)
    @dictionary = Set.new()
    @dictionary << File.readlines(dictionary)
    @fragment = ""
    @current_player = players[0]
    @previous_player = players[1]
  end

  def current_player
    @current_player
  end

  def previous_player
    @previous_player
  end

  def next_player!
    @current_player, @previous_player = @previous_player, @current_player
  end

  def take_turn(player)
    until game_over?
      @fragment += @current_player.guess
      next_player!
    end
  end

  def valid_play?(string)
    @dictionary.any? { |w| w[0, @fragment.length + 1] == @fragment + string }
  end

  def game_over?
    @dictionary.include?(@fragment)
  end

end

players =  [Player.new("steve"), Player.new("bob")]

if __FILE__ == $PROGRAM_NAME
  Game.new("Dictionary.txt", players)
end
