let id : number = 5
let firstName = "Kenil"
// firstName = 12   TSC throws error
var lastName = "Kanani"
// lastName = 13 TSC throws error


// Union of types
let userId : number | string = "Kenil"
userId = 12 

// We can not be always very very strict, so we can write union of types to be safe

// Array
// let <name_of_variable> : <type>[] = [val1, val2, val3, ...]
let ids : number[] = [1,2,3,4,5] 
// let ids : number[] = [1,2,3,4,'k']   TSC throws error

// heterogenious arrays
let heros : any[] = [1,2,3,'k']

let data : (number | string | boolean)[] = [1,2,'kenil' , 4 , true]

// arrays in form of type tupple
let data1 : [number , string , boolean] = [1 , 'Kenil' , true]

// How to defined types for objects
// 1. classes -> data members , member functions
// 2. interface -> its contract

class Car {
    name : string
    constructor(name : string){
        this.name = name
    }

    display(){
        console.log(this.name)
    }
}
// classes are blueprint , to actually create a javascript object, we use classes.
let c1 = new Car("BMW")

interface Product {
    name : string
    price : number
    brand : string
    display() : void
}

// let p1 = new Product()  We can not do

let p1 : Product = {
    name : "Iphone",
    price : 1000,
    brand : "Apple",
    display: () => {
        console.log("display")
    }
}
// we can use inteface to define a complete existing object , but can not create a object using "new"
console.log(p1)

// Function in TypeScript

function sum1(a : number,b : number) : number {
    return a + b
}

function sum2(a : number,b? : number) : number {
    return a + (b || 0)
}
// If we do not pass b then it will be undefined

function sum3(a : number,b? : number) : number {
    return a + (b || 0)
}
// b is optional, if b is not present then we return 0

// TypeScript does't exists in runtime , typescript will always convert your code to javascript and javascript will actually run
// TypeScript is a development tool , it will not do any code type checking at run type , all type checking happen at the compile time
// We will be able to setup a configuration , that if there is any compilation issue commig due to TypeScript your code will not run, but if somehow you bypass that compilation step and you still run it, it will run like normal javascript
// how normal javascript behave, your code will behave just like that

// Date obj in TS
const dob = new Date(1998 , 3 , 11)
console.log(dob)
console.log(dob.getDate())

// any type -> your free ticket to get rid of TS type checking
// if you want to define variable with type any, then either mention ": any" while declaring the variable or do not assign a value while declaring variable
let x; // this variable x is of type any
x = 10
x = "10"

// Question : The main thing TypeScript is offring is type checking, then why there is a type of "any"?
// -> There can be cases, where it won't be posible for you to create a typescript type to represent an item

function fun1() : void {
    // return type of the function does not mean
    // return undefined
}

function fun2() : (number | string) {  // can return union of type
    return "10"
}

function fun3() : number | string {  // can return union of type without "()"
    return 10
}

// ENUMS or Enumeration

// interally maped to a bunch of integers
enum TicketStatus {
    INITIALSED,
    CANCELLED,
    PENDING,
    CLOSED
}
console.log(TicketStatus.INITIALSED)   // 0
console.log(TicketStatus.CANCELLED)    // 1
console.log(TicketStatus.PENDING)      // 2
console.log(TicketStatus.CLOSED)       // 3

const Ticket = {
    id : 1,
    title : "new ticket",
    status : TicketStatus.INITIALSED
}

console.log(Ticket.status)  // 0

// easy to compare
if(Ticket.status == TicketStatus.INITIALSED){
    // execute the code
}

// assign diffrent values to enum
enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    Created = 201,
    BadRequest = 400
}

const response = {
    url : "www.something.com",
    type : "GET",
    data : "some strings",
    status : StatusCodes.Success
}

console.log(response.status) // 200

// Type inferring

const result = {
    name : "Kenil",
    markes : 98
}
// the type of the above object is inferred as {name : string , marks: number}
// something like the given object below 
// const result : {name : string , markes : number} = {
//     name : "Kenil",
//     markes : 98
// }
console.log(result)

// updating an old key value pair
result.markes = 99

// adding a new key value pair
// result.address = "XYZ"  
// Now the above stetment will throw a compiler error because in the type {name : string , marks: number}, we never mentation anything about any address.
// Thats why TS think, we are violating the default type.
// To solve this, we can add an additional optional address properity while defining the object
// const result : {name : string , markes : number , address? : string} = {
//     name : "Kenil",
//     markes : 98
// }


type Details = {name : string , marks : number , address? : string}
// Details is kind of like an alias or a nickname to {name : string , marks : number , address? : string}
const result2 : Details = {
    name : "Kenil",
    marks : 100
} 

/**
 * We want to define a common type for authentication forms
 * this common type will take multiple parameters
 * - name of the form
 * - how to handle submition of the form
 * - how to handle reset of the form
 * - what should be the text of the submiting button
 */

interface AuthForm {
    name : string,
    submitButtonText : string,
    onReset : (e : any) => void,
    onSubmit : (e : any) => void
} 

// what is the benifit of defining the interface here? 
// Ans -> We can define a contract, that at any point of time , anywhere in your application ; somebody has to create a kind of like a form , which is somehow handling any authentication, they have to always fullfill this interface.
const loginForm : AuthForm = {
    name : "Login Form",
    submitButtonText : "Login",
    onReset: () => {
        // some implementation
    },
    onSubmit : () => {
        // some implementation
    }
}


// types vs interface

type text = string

// for defining custom types for arrays, type keyword is more easy
type stringArray = string[]

// using an interface we will define an object which will be always having keys of type number and value to be of the type of the array  
interface numberArray {
    [index : number] : number
}

// Let's say we want to define a pair of a triplet or a custom tuple (set of x values)
type pair1 = [number , number]
type triplate = [number , number , number]

interface pair2 {
    first : number,
    second : number
}

// Can type and interfaces represent functions ?
type logger = (msg : string , errorCode : number) => void

interface loggerInterface {
    // logg : (msg : string , errorCode : number) => void
    (msg : string , errorCode : number) : void
}

// Defining unions is possible with type but not interfaces
type unionOfStringAndNumber = number | string

interface ComplexNumber {
    real : number,
    imaginary : number
}

interface ComplexNumber {
    add : (num : ComplexNumber) => ComplexNumber
}

// above both and below one is equivalent
/**
 * interface ComplexNumber {
    real : number,
    imaginary : number
    add : (num : ComplexNumber) => ComplexNumber
    }
 */

type Complex = {
    real : number,
    imag : number
}

interface IComplex {
    real : number,
    imag : number
}

let complex1 : Complex = {
    real : 10,
    imag : 10
}

let complex2 : IComplex = {
    real : 10,
    imag : 10
}

console.log(complex1)

complex1 = complex2  // TS will consider Complex and IComplex same because the members are same. 
// names are diffrent , still it does not matter

console.log(complex1)

// type Complex = {
//     real : number,
//     imag : number
// }

// still we can assign IComplex variable to Complex variable , because TS demands bareMinimum proparties that needed to assign Complex.

// interface IComplex {
//     real : number,
//     imag : number,
//     add : () => void 
// }
