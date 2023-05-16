module Main.DecodeError where

import Prelude
import Data.Show (class Show)

data DecodedVal a = DecodeErr String | Val a

instance showDecodedVal :: (Show a) => Show (DecodedVal a) where
    show (DecodeErr x) = x
    show (Val       v) = show v