require 'rspec'
require 'dessert'

=begin
Instructions: implement all of the pending specs (the `it` statements without blocks)! Be sure to look over the solutions when you're done.
=end

describe Dessert do
  let(:chef) { double("chef") }
  let(:dessert) { Dessert.new("pudding", 10, chef)}
  describe "#initialize" do
    it "sets a type" do
      expect(dessert.type).to eq("pudding")
    end

    it "sets a quantity" do
      expect(dessert.quantity).to eq(10)
    end

    it "starts ingredients as an empty array" do
      expect(dessert.ingredients).to eq([])
    end

    it "raises an argument error when given a non-integer quantity" do
      expect{ Dessert.new("pudding", "3", chef)}.to raise_error(ArgumentError)
    end
  end

  describe "#add_ingredient" do
    before(:each) do
      dessert.add_ingredient("cream")
    end

    it "adds an ingredient to the ingredients array" do
      expect(dessert.ingredients).to eq(["cream"])
    end
  end

  describe "#mix!" do
    before(:each) do
      dessert.add_ingredient("milk")
      dessert.add_ingredient("sugar")
      dessert.add_ingredient("vanilla")
      dessert.add_ingredient("egg")
      dessert.mix!
    end

    it "shuffles the ingredient array" do
      expect(dessert.ingredients).to_not eq(["cream", "milk", "sugar", "vanilla", "egg"])
    end
  end

  describe "#eat" do
    before(:each) do
      dessert.eat(1)
    end
    it "subtracts an amount from the quantity" do
      expect(dessert.quantity).to eq(9)
    end

    it "raises an error if the amount is greater than the quantity" do
      expect{ Dessert.new("pudding", "3", chef).eat(4)}.to raise_error(ArgumentError)
    end
  end

  describe "#serve" do
    it "contains the titleized version of the chef's name" do
      allow(chef).to receive(:titleize).and_return("Chef chef the Great Baker")
      expect(dessert.serve).to include("the Great")
    end
  end

  describe "#make_more" do
    it "calls bake on the dessert's chef with the dessert passed in" do
      allow(chef).to receive(:bake).with(dessert)
      expect(chef).to receive(:bake).with(dessert)
      dessert.make_more
    end
  end
end
