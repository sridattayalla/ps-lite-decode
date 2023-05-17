module Main.DecodeError where

import Prelude
import Data.Show (class Show)
import Control.Alt (class Alt)

data DecodedVal a = DecodeErr String | Val a

instance showDecodedVal :: (Show a) => Show (DecodedVal a) where
    show (DecodeErr x) = x
    show (Val       v) = show v

instance functorDecodedVal :: Functor DecodedVal where
    map fun (DecodeErr x) = DecodeErr x
    map fun (Val       v) = Val $ fun v

instance altDecodedVal :: Alt DecodedVal where
    alt (Val val) _ = Val val
    alt _         (Val val) = Val val
    alt _         x = x