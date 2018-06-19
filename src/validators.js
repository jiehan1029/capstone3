export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
  value.trim() !== '' ? undefined : 'Cannot be empty';

export const noWhiteSpacePadding = value =>
  value.trim()===value ? undefined : 'Cannot have white space as start or end character';

export const minLength = value =>
  value.length>=4? undefined: 'Minimal length is 4';

export const maxLength = value =>
	value.length<=24? undefined: 'Maximal length is 24';