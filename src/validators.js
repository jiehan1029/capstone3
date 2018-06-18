export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
// Uses a regular expression (regex) to check whether it looks enough like an
// email address.  Broken down:
// ^ Matches the start the text
// \S+ Matches one or more non-whitespace characters before the @
// @ A literal at sign
// \S+ Matches one or more non-whitespace characters after the @
// $ Matches the end of the text
export const noWhiteSpacePadding = value =>
    value.trim()===value ? undefined : 'Cannot have white space as start or end character';

export const minLength = value=>
    value.length>=4? undefined: 'Minimal length is 4';