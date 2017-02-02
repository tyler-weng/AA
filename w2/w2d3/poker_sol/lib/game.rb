require_relative './player'
require_relative './deck'

class Game

  attr_reader :pot, :deck, :players

  def initialize
    @pot = 0
    @deck = Deck.new
    @players = []
  end

  def add_players(n, bankroll)
    n.times { @players << Player.new(bankroll)}
  end

  def game_over?
    @players.select { |pl| pl.bankroll > 0 }.length == 1
  end

  def deal_cards
    @players.each do |pl|
      pl.bankroll == 0 ? pl.hand = nil : pl.hand << @deck.take(5)
    end
  end

  def add_to_pot(amt)
    @pot += amt
  end

end
