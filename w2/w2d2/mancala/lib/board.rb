class Board
  attr_accessor :cups

  def initialize(name1, name2)
    @name1, @name2 = name1, name2
    @cups = Array.new(14) { Array.new }
    place_stones
  end

  def place_stones
    (0..13).each do |i|
      next if i == 6 || i == 13
      4.times { @cups[i] << :stone}
    end
  end

  def valid_move?(start_pos)
    raise "Invalid starting cup" unless start_pos.between?(1, 14)
  end

  def make_move(start_pos, current_player_name)
    stones = []

    side = (current_player_name == @name1) ? 1 : 2
    winning_cup_idx = side == 1 ? 6 : 13
    if start_pos.between?(1, 6)
      i = start_pos - 1
    else
      i = start_pos
    end

    until @cups[i].empty?
      stones << @cups[i].shift
    end

    puts  "#{stones.length} stones"
    puts "cups at #{@cups[3]}"

    i += 1
    until stones.empty?
      if side == 1
        @cups[i] << stones.shift if i.between?(0, 6)
      else
        @cups[i] << stones.shift if i.between?(7, 13)
      end
      i += 1
      i = 0 if i == 14
    end

    i = i == 0 ? 13 : i - 1
    render
    next_turn(i, current_player_name)
  end

  def next_turn(ending_cup_idx, current_player_name)
    point_cup_idx = current_player_name == @name1 ? 6 : 13

    if @cups[ending_cup_idx - 1].empty?
      return :switch
    elsif point_cup_idx == ending_cup_idx
      return :prompt
    else
      return ending_cup_idx
    end
  end

  def render
    print "      #{@cups[7..12].reverse.map { |cup| cup.count }}      \n"
    puts "#{@cups[13].count} -------------------------- #{@cups[6].count}"
    print "      #{@cups.take(6).map { |cup| cup.count }}      \n"
    puts ""
    puts ""
  end

  def one_side_empty?
    @cups[0..5].flatten.empty? || @cups[7..12].flatten.empty?
  end

  def winner
    return :draw if @cups[6].length == @cups[13].length
    @cups[6].length > @cups[13].length ? @name1 : @name2
  end
end
