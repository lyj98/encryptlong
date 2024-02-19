

declare interface IDERIntegerParams {
    bigint?:any;
    int?:number;
    hex?:number;
}

declare class DERInteger {
    /**/
}

declare type IDERIntegerConstructor = new(params:IDERIntegerParams) => DERInteger;

declare class DERSequence {
    /**/
    public getEncodedHex():string;
}
declare type IDERSequenceConstructor = new(params:{
        array:DERInteger[];
    }) => DERSequence;


declare class DERObjectIdentifier {
    /**/
}
declare type IDERObjectIdentifierConstructor = new(params:{
        oid?:string;
        hex?:string;
        name?:string;
    }|string) => DERObjectIdentifier;


declare class DERNull {
    /**/
}
declare type IDERNullConstructor = new() => DERNull;


declare class DERBitString {
    /**/
}
declare type IDERBitStringConstructor = new(params:{
        hex?:string;
        array?:boolean[];
        bin?:string;
    }|string) => DERBitString;


declare interface IAsn1 {
    readonly DERInteger:IDERIntegerConstructor;

    readonly DERSequence:IDERSequenceConstructor;

    readonly DERObjectIdentifier:IDERObjectIdentifierConstructor;

    readonly DERNull:IDERNullConstructor;

    readonly DERBitString:IDERBitStringConstructor;
}

declare interface IKJUR {
    readonly asn1:IAsn1;
}


export const KJUR:IKJUR;
