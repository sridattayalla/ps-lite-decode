module Main.DecodeError where

import Prelude

data DecodedVal a = DecodeErr String | Val a