require_relative 'board'
require_relative 'card'
require_relative 'player'
require 'byebug'

class Game
  attr_reader :board
  def initialize(board = Board.new)
    @board = board
    @player = HumanPlayer.new
  end

  def play
    @board.display
    until @board.all_revealed?
      take_turn
    end

    puts "VICTORYYYY!!!!!"
  end

  def take_turn
    card_pair = select_pair
    @board.flip_cards(card_pair) unless @board.cards_match?(card_pair)
    system('clear')
    @board.display
  end

  def select_pair
    first_guess = @player.get_guess
    reveal_card(first_guess)
    @board.display
    second_guess = get_second_guess(first_guess)
    reveal_card(second_guess)
    @board.display
    sleep(2)
    [@board[first_guess], @board[second_guess]]
  end

  def reveal_card(pos)
    @board.select_card(pos)
    @board.selected_card.flip_card
  end

  def get_second_guess(first_guess)
    valid_guess = false
    until valid_guess
      second_guess = @player.get_guess
      valid_guess = true if first_guess != second_guess
      puts "Already guessed that pos" unless valid_guess
    end

    second_guess
  end

end


if __FILE__ == $PROGRAM_NAME
  test = Game.new
  test.play
end
