class SudokuChecker

  def initialize(file)
    @board = SudokuChecker.from_file(file)
  end

  def self.from_file(file)
    sudoku = File.readlines(file)
    sudoku.map(&:chomp).map{ |num| SudokuChecker.to_digits(num) }
  end

  def self.to_digits(number)
    number.to_s.chars.map(&:to_i)
  end

  def check
    rows_solved = @board.all? { |row| one_through_nine?(row) }
    cols = @board.transpose
    cols_solved = cols.all? { |col| one_through_nine?(col) }
    ninths = split_ninths(@board)
    ninths_solved = ninths.all? { |ninth| one_through_nine?(ninth) }

    rows_solved && cols_solved && ninths_solved
  end

  def one_through_nine?(row)
    row.sort == (1..9).to_a
  end

  def split_ninths(board)
    slices = []
    almost_answers = []
    final_answers = []

    board.each do |row|
      row.each_slice(3) { |slice| slices << slice.to_a }
    end

    col_index = 0
    while col_index < 3
      slices.each_with_index do |slice, index|
        almost_answers << slice if index % 3 == col_index
      end
      col_index += 1
    end

    almost_answers.each_slice(3) do |slice|
      final_answers << slice.flatten
    end

    final_answers
  end

end

test = SudokuChecker.new('sudoku1-solved.txt')
p test.check
