require_relative 'card'
require 'byebug'

class Board

  attr_reader :selected_card

  def initialize(half_size = 1) #board is forced to be square for now
    @size = half_size * 2
    @grid = Array.new(@size) { Array.new(@size) }
    @selected_card = nil
    populate
  end

  def flip_cards(cards)
    cards.each { |card| card.flip_card }
  end

  def select_card(pos)
    @selected_card = self[pos]
  end

  def cards_match?(card_pair)
    card_pair.first.face_value == card_pair.last.face_value
  end

  def all_revealed?
    @grid.flatten.all? { |card| card.is_face_up }
  end

  def [](pos)
    row, col = pos[0], pos[1]
    @grid[row][col]
  end

  def populate
    all_cards = generate_cards
    @grid.each_with_index do |row, row_index|
      row.each_with_index do |card, col_index|
        @grid[row_index][col_index] = all_cards[row_index * @size + col_index]
      end
    end
  end

  def generate_cards
    unique_cards = []
    until unique_cards.size == calc_num_pairs
      new_card = Card.new
      new_card_value = new_card.face_value
      next if unique_cards.any? { |card| card.face_value == new_card_value }
      unique_cards << new_card
    end
    temp = []
    unique_cards.each do |card|
      temp << card.duplicate_card
    end
    (unique_cards + temp).shuffle
  end

  def calc_num_pairs
    (@size ** 2) / 2
  end

  def display
    @grid.each do |row|
      row.each do |card|
        if card.is_face_up
          print "| #{card.face_value} |"
        else
          print "| nil |"
        end
      end
      print "\n"
    end
  end

  def reveal_all
    @grid.each do |row|
      row.each do |card|
        print "| #{card.face_value} |"
      end
      print "\n"
    end

  end

end
