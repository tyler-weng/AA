require 'byebug'

class Card

  attr_reader :is_face_up
  attr_accessor :face_value

  FACE_VALUES = (1..99).to_a

  def initialize
    @face_value = FACE_VALUES.sample
    @is_face_up = false
  end

  def duplicate_card
    new_card = Card.new
    new_card.face_value = self.face_value
    new_card
  end

  def reveal
    @is_face_up = true
  end

  def hide
    @is_face_up = false
  end

  def flip_card
    self.is_face_up ? self.hide : self.reveal
  end

end
