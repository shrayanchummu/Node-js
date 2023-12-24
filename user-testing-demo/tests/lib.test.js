const lib=require('../lib');

describe('absolute',()=>{
    it('should return a positive num if input is positive',()=>{
        const result=lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a positive num if input is negative',()=>{
        const result=lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return a 0 if input is 0',()=>{
        const result=lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet',()=>{
    it('should return greeting message',()=>{
        const result=lib.greet('Chummu');
        // too specific
        // expect(result).toBe('Welcome Chummu');
        expect(result).toMatch(/Chummu/);
        expect(result).toContain('Chummu');
    });
});

describe('getCurrencies',()=>{
    it('should return currencices',()=>{
        const result=lib.getCurrencies();
        // too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        // too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        // proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
    });
});

describe('getProducts',()=>{
    it('should return product with given id',()=>{
        const result=lib.getProduct(1);
        //expect(result).toBe({id:1,price:10});
        //fails test because toBe returns reference...so we should use toEqua;
        expect(result).toEqual({id:1,price:10});
        expect(result).toMatchObject({id:1,price:10});
        // expect(result).toHaveObject('id',1);
    });
});

describe('registerUser',()=>{
    it('should throw if username is falsy',()=>{
        // Null
        // undefined
        // NaN
        // ''
        // 0
        // false
        expect(()=>{ lib.registerUser(null) }).toThrow();   
    });
    it('should return a valid object if name is passed',()=>{
        const result = lib.registerUser('Chummu')
        expect(result).toMatchObject({username:'Chummu'});   
    });
});
