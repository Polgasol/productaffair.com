import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajvInstance = new Ajv({ allErrors: true });
// { allErrors: true } means hindi titigil sa isang error, irurun nya muna lahat bago nya sabihin ang mga errors
ajvErrors(addFormats(ajvInstance));

export default ajvInstance;
