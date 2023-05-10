export function decodeInternal(value_type) {
    return function() {
        let newJson = {}
        var value =  {"yavfv":"yybodkm","nciv":false,"naz":true,"feqrv":9,"jtm":2,"bgenup":"lqe","vejj":48,"icyfmo":56,"wyp":11,"kwcm":33,"fivy":"fnbkwi","nwyy":95,"unbzopq":true,"taj":"iyzktj","ildgckd":true,"zrmedo":"eaczmd","ecl":29,"apsoy":9,"tmum":86,"kmwb":true,"mtyrc":19,"giowwec":"yzou","aazh":false,"ttmh":62,"ybrr":"iwi","ykbaag":false,"kil":true,"jjloe":19,"ywqo":true,"cypthbn":61}
        try {
            // let keys = Object.keys(value_type);
            for(let i = 0 ; i < value_type.length; i++) {
                if (value_type[i][1] != typeof value[value_type[i][0]])
                {
                    console.log(value_type[i][1], typeof value[value_type[i][0]])
                    throw "type Mismatch";
                } else {
                    newJson[value_type[i][0]] = value[value_type[i][0]];
                }
            }
        } catch(err) {
            console.log(err)
        }
        return newJson;
    }
}

export function decodeArr(fn){
    return function(fun){
        const ret = [];
        for (let i =0; i < fn.length ; i++) {
            ret.push(fun(fn[i]))
        }
        return ret;
    }
}

export function lookupVal(fn){
    return (key)=>{
        return fn[key]
    }
}

export function unsafeInsert(key){
    return (val)=>{
        return (rec)=>{
            try{
                rec[key] = val
                return rec
            }
            catch (e) {
                return rec
            }
        }
    }
}

export function decodeStrImpl(fn){
    if(typeof fn === "string"){
        return fn
    }
    throw new Error("")
}

export function decodeIntImpl(fn){
    if(typeof fn === "number"){
        return fn
    }
    throw new Error("")
}

export function decodeNumImpl(fn){
    if(typeof fn === "number"){
        return fn
    }
    throw new Error("")
}

export function decodeBoolImpl(fn){
    if(typeof fn === "boolean"){
        return fn
    }
    throw new Error("")
}

export function decodeMaybeImpl(fn){
    return (fun)=>{
        return (nothing)=>{
            return (just)=>{
                if(fn === undefined){
                    return nothing
                }
                return just(fun(fn))
            }
        }
    }
}

export function safeDecodeImpl(fn){
    return (err)=>{
        return (val)=>{
            return (fun)=>{
                try{
                    return val(fun(fn));
                } catch (e) {
                    return err(e.toString())
                }
            }
        }
    }
}