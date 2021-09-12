package misc

import (
	"testing"
)

func TestHello(t *testing.T) {
	if err := Hello(); err != nil {
		t.Errorf("You got an error when call Hello!")
	}
}
