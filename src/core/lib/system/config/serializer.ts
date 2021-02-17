/**
 * Interface to serialize and deserialize config data from arbitrary formats.
 */
interface Serializer {
  /**
   * Serialize config object.
   */
  toString: (data: object) => string;

  /**
   * Deserialize config object.
   */
  toObject: (data: string) => object;
}

export default Serializer;
