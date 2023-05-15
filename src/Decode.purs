module LiteDecode.Decode where

import Prelude

import Data.Symbol (class IsSymbol, reflectSymbol)
import Prim.Row (class Cons, class Lacks)
import Type.Proxy (Proxy(..))
import Type.RowList (class RowToList, RowList, Nil, Cons)
import Foreign (Foreign)
import Main.DecodeError (DecodedVal(..))
import Data.Maybe (Maybe, Maybe(Nothing), Maybe(..))
import Data.Either (Either(..))
import Foreign.Generic.Class (class Decode, decode)
import Control.Monad.Except (runExcept)

class DecodeFn a where
    internalDecode :: Foreign -> a

foreign import decodeStrImpl :: Foreign -> String
foreign import decodeIntImpl :: Foreign -> Int
foreign import decodeNumImpl :: Foreign -> Number
foreign import decodeBoolImpl :: Foreign -> Number
foreign import decodeArr :: forall a. Foreign -> (Foreign -> a) -> Array a
foreign import decodeMaybeImpl :: forall a. Foreign -> (Foreign -> a) -> (Maybe a) -> (_ -> Maybe a) -> Maybe a

instance decodeString :: DecodeFn String where
    internalDecode = decodeStrImpl

else instance decodeInt :: DecodeFn Int where
    internalDecode = decodeIntImpl

else instance decodeNumber :: DecodeFn Number where
    internalDecode = decodeNumImpl

else instance decodeBoolean :: DecodeFn Boolean where
    internalDecode _ = true

else instance decodeArray :: DecodeFn a => DecodeFn (Array a) where
    internalDecode obj = decodeArr obj internalDecode

else instance decodeMaybe :: DecodeFn a => DecodeFn (Maybe a) where
    internalDecode obj = decodeMaybeImpl obj internalDecode Nothing Just

else instance decodeRecord ::
  ( GDecodeJson row list
  , RowToList row list
  ) =>
  DecodeFn (Record row) where
  internalDecode json = gDecodeJson json (Proxy :: Proxy list)

else instance decodeFn__ :: (Decode a) => DecodeFn a where
   internalDecode obj =
       case runExcept $ decode obj of
           Right x   -> x
           Left  err -> throwErr "failed in foreign-generic decode"

else instance decodeFn_ :: (LiteDecode a) => DecodeFn a where
    internalDecode obj =
        case liteDecode obj of
            Right x   -> x
            Left  err -> throwErr err

class GDecodeJson (row :: Row Type) (list :: RowList Type) | list -> row where
  gDecodeJson :: forall proxy. Foreign -> proxy list -> (Record row)

instance gDecodeJsonNil :: GDecodeJson () Nil where
  gDecodeJson _ _ = {}

foreign import lookupVal :: Foreign -> String -> Foreign

unsafeInsert :: forall r1 r2 l a
   . IsSymbol l
  => Lacks l r1
  => Cons l a r1 r2
  => Proxy l
  -> a
  -> Record r1
  -> Record r2
unsafeInsert l a r = unsafeInsertImpl (reflectSymbol l) a r

foreign import unsafeInsertImpl :: forall a r1 r2. String -> a -> Record r1 -> Record r2

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
    unsafeInsert _field (internalDecode $ lookupVal object symbol) (gDecodeJson object (Proxy :: Proxy tail))
    --- decode :: foreign -> success -> failure
    -- success x =
    --      val = unsafeInsert x
    --      next foreign

foreign import safeDecodeImpl :: forall a. Foreign -> (String -> DecodedVal a) -> (a -> DecodedVal a) -> (Foreign -> a) -> DecodedVal a

safeDecode :: forall a. (DecodeFn a) => Foreign -> DecodedVal a
safeDecode obj = safeDecodeImpl obj DecodeErr Val internalDecode

foreign import throwErr :: forall a. String -> a

class LiteDecode a where
    liteDecode :: Foreign -> Either String a

class ChainDecode a where
    chainDecode :: Foreign -> (a -> DecodedVal a) -> (String -> DecodedVal a) -> DecodedVal a

foreign import decodeStrChain :: Foreign -> (String -> DecodedVal String) -> (String -> DecodedVal String) -> DecodedVal String

foreign import emptyRecord :: forall row. Record row

instance chainDecodeString :: ChainDecode String where
    chainDecode obj success failure =
        decodeStrChain obj success failure

--else instance decodeRecordChain ::
--  ( FDecodeRecord row list
--  , RowToList row list
--  ) =>
--  ChainDecode (Record row) where
--  chainDecode obj success failure = fDecodeRecord obj emptyRecord success failure (Proxy :: Proxy list)

class FDecodeRecord (row :: Row Type) (list :: RowList Type) | list -> row where
    fDecodeRecord :: forall p a. Foreign -> p list -> (Record row -> a) -> (String -> a) -> a

instance nullRecordDecode :: FDecodeRecord () Nil where
    fDecodeRecord _ _ success failure = success {}

rollRecord key obj success failure =
    let val = lookupVal obj key
    in success val


instance somRecordDecode :: (IsSymbol field, ChainDecode val) => FDecodeRecord row (Cons field val tail) where
    fDecodeRecord obj _ success failure = let
        f = Proxy :: Proxy field
        _field = reflectSymbol f
        in unsafeInsert f

{-
success -> a
failure -> a

decodeStr -> obj -> s -> f

s val =
    success


-}