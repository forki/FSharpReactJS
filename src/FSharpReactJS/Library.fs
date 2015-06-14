namespace FSharpReactJS

/// Documentation for my library
///
/// ## Example
///
///     let h = Library.hello 1
///     printfn "%d" h
///
module Library = 
  
  /// Returns 42
  ///
  /// ## Parameters
  ///  - `num` - whatever
  let hello num = 42

type User = 
    {
        FirstName: string
        LastName: string
    }

type Res = 
    {
        choices : string array
    }
