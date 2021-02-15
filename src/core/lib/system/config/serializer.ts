/**
 * Interface to serialize and deserialize config data from arbitrary formats.
 */
interface Serializer {
  /**
   * Serialize config object.
   */
  toString: (object) => string;

  /**
   * Deserialize config object.
   */
  toObject: (string) => object;
}

export default Serializer;
