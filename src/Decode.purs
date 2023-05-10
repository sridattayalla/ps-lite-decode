module Decode where

import Prelude

import Data.Symbol (class IsSymbol, reflectSymbol)
import Prim.Row (class Cons, class Lacks)
import Type.Proxy (Proxy(..))
import Type.RowList (class RowToList, RowList, Nil, Cons)
import Foreign (Foreign)
import Main.DecodeError (DecodedVal(..))
import Data.Newtype (class Newtype, wrap)
import Data.Maybe (Maybe, Maybe(Nothing), Maybe(..))

foreign import decodeInternal :: Unit

class DecodeFn a where
    internalDecode :: Foreign -> a

foreign import decodeStrImpl :: Foreign -> String

instance decodeString :: DecodeFn String where
    internalDecode = decodeStrImpl

foreign import decodeIntImpl :: Foreign -> Int

instance decodeInt :: DecodeFn Int where
    internalDecode = decodeIntImpl 

foreign import decodeNumImpl :: Foreign -> Number

instance decodeNumber :: DecodeFn Number where
    internalDecode = decodeNumImpl

foreign import decodeBoolImpl :: Foreign -> Number

instance decodeBoolean :: DecodeFn Boolean where
    internalDecode _ = true

foreign import decodeArr :: forall a. Foreign -> (Foreign -> a) -> Array a

instance decodeArray :: DecodeFn a => DecodeFn (Array a) where
    internalDecode fn = decodeArr fn internalDecode

foreign import decodeMaybeImpl :: forall a. Foreign -> (Foreign -> a) -> (Maybe a) -> (_ -> Maybe a) -> Maybe a

instance decodeMaybe :: DecodeFn a => DecodeFn (Maybe a) where
    internalDecode fn = decodeMaybeImpl fn internalDecode Nothing Just

instance decodeRecord ::
  ( GDecodeJson row list
  , RowToList row list
  ) =>
  DecodeFn (Record row) where
  internalDecode json = gDecodeJson json (Proxy :: Proxy list)

class GDecodeJson (row :: Row Type) (list :: RowList Type) | list -> row where
  gDecodeJson :: forall proxy. Foreign -> proxy list -> (Record row)

instance gDecodeJsonNil :: GDecodeJson () Nil where
  gDecodeJson _ _ = {}

foreign import lookupVal :: Foreign -> String -> Foreign

unsafeInsert' :: forall r1 r2 l a
   . IsSymbol l
  => Lacks l r1
  => Cons l a r1 r2
  => Proxy l
  -> a
  -> Record r1
  -> Record r2
unsafeInsert' l a r = unsafeInsert (reflectSymbol l) a r

foreign import unsafeInsert :: forall a r1 r2. String -> a -> Record r1 -> Record r2

instance gDecodeJsonCons ::
  ( DecodeFn value
  , GDecodeJson rowTail tail
  , IsSymbol field
  , Cons field value rowTail row
  , Lacks field rowTail
  ) =>
  GDecodeJson row (Cons field value tail) where
  gDecodeJson object _ = do
    let
      _field = Proxy :: Proxy field
      symbol = reflectSymbol _field
    -- Todo not so good, move it to js to make this as lil overhead and as easy as possible
    -- recursion is happening here, make it a loop
    unsafeInsert' _field (internalDecode $ lookupVal object symbol) (gDecodeJson object (Proxy :: Proxy tail))

--instance newTypeDecode :: (DecodeFn a) => DecodeFn (Newtype a) where
--    internalDecode = wrap <<< internalDecode

foreign import safeDecodeImpl :: forall a. Foreign -> (String -> DecodedVal a) -> (a -> DecodedVal a) -> (Foreign -> a) -> DecodedVal a

safeDecode :: forall a. (DecodeFn a) => Foreign -> DecodedVal a
safeDecode fn = safeDecodeImpl fn DecodeErr Val internalDecode