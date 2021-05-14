import objectHash from 'object-hash';

function hex(data: any): string {
  return objectHash(data, {
    algorithm: 'sha256',
    unorderedArrays: true,
    unorderedObjects: true,
    unorderedSets: true,
    encoding: 'hex',
  });
}

function base64(data: any): string {
  return objectHash(data, {
    algorithm: 'sha256',
    unorderedArrays: true,
    unorderedObjects: true,
    unorderedSets: true,
    encoding: 'base64',
  });
}

export default {
  base64,
  hex,
};
