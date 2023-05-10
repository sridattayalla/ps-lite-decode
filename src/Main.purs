{-|
  This is a program to traverse a record and get the keys and types of the fields.
  Supports all primitive types like String, Int, Char, Number, Boolean along with nested Records and Arrays.
-}
module Main where

import Prelude

import Data.Show (class Show)
import Data.Array (tail, (:))
import Foreign (Foreign)
import Decode
import Main.DecodeError
import Effect.Console (log)
import Data.Newtype (wrap)
import Data.Maybe (Maybe)
import Data.Unit (unit)
import Data.Generic.Rep
import Foreign.Generic.Class (decode, class Decode)
import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Types (BigType)
import Type.Proxy (Proxy)

--type Movie = {id :: Maybe Int, title :: String, rating :: Number, year :: Int, cast :: Array Cast, reviews:: {count :: Int, user :: Array User}}
--
--type User = {name :: String, likedMovies :: Array {id :: Int}}
--
--data Cast = Actor String | Director String | Musician String
--
--foreign import stringify :: Foreign -> String
--
--instance castDecode :: DecodeFn Cast where
--    internalDecode fn = Actor (stringify fn)
--
--instance showCast :: Show Cast where
--    show c =
--        case c of
--            Actor a -> "Actor " <> a
--            Director d -> "Director " <> d
--            Musician m -> "Musician " <> m
 
foreign import movieData :: Unit -> Foreign
foreign import startProfile :: Unit -> Unit
foreign import endProfile :: Unit -> Unit

--getMovieData :: Either (Array Movie)
getMovieData = let
    _ = startProfile unit
    val = safeDecode (movieData unit)
    _ = endProfile unit
    in val
    
--
--val :: String
--val =
--    case runExcept getMovieData of
--        Left _ -> ""
--        Right (x :: Array BigType) -> show x

val :: String
val =
    case getMovieData of
        DecodeErr x -> x
        Val (x :: Array BigType) -> show x

foreign import carData :: Unit -> Foreign

newtype Car = Car {wheels :: Int, fuelLevel :: Maybe Number}

instance decodeCar :: DecodeFn Car where
    internalDecode fn = Car (internalDecode fn)

instance showCar :: Show Car where
    show (Car x) = show x 
    
val' :: String
val' =
    case safeDecode (carData unit) :: DecodedVal Car of
        DecodeErr x -> x
        Val       x -> show x

main = log $ ""--val