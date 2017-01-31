class Simon
  COLORS = %w(red blue green yellow)

  attr_accessor :sequence_length, :game_over, :seq

  def initialize
    @sequence_length = 1
    @game_over = false
    @seq = []
  end

  def play
    until @game_over
      take_turn
    end

    game_over_message
    reset_game
  end

  def take_turn
    show_sequence
    sleep(2)
    require_sequence
    unless @game_over
      @sequence_length += 1
      round_success_message
    end
  end

  def show_sequence
    @seq.dup
    add_random_color
  end

  def require_sequence
    @seq.each.with_index do |color, i|
      puts "Please enter color sequence shown one at a time"
      color_guess = gets.chomp
      @game_over = true if color_guess != color
    end
  end

  def add_random_color
    @seq << COLORS[rand(COLORS.size)]
  end

  def round_success_message
    puts "Cleared the round!"
  end

  def game_over_message
    puts "WRONG! YOU LOSE!"
  end

  def reset_game
    @sequence_length = 1
    @game_over = false
    @seq = []
  end
end
