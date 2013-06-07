require 'test_helper'

class SoundsControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get remove" do
    get :remove
    assert_response :success
  end

end
