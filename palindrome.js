function palindrome(string) {
// iterate through string
// first letter needs to match last letter, (char[0] === char[char.length-1])
// second letter needs to match second to last.. etc (char[1] == char[char.length -1 ])
// handle odd number of chars: middle character === middle character
  let chars = string.split('');
  for(let i = 0; i < chars.length; i++) {
    if (chars[i] != chars[chars.length - (i+1)]) {
      return false
    }
  }
  return true
}