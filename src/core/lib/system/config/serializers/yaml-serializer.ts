import YAML from 'yaml';

import Serializer from '@core/lib/system/config/serializer';
import SerializationError from '@core/lib/system/config/serialization-error';

/**
 * Serializes and deserializes config data to and from YAML.
 */
class YamlSerializer implements Serializer {

  // TODO Document thrown `SerializationError` exception via JSDoc.
  /**
   * Serialize config object into YAML string.
   *
   * @param {Object} data - Object to serialize.
   *
   * @returns {string} Serialized YAML string.
   */
  public toString(data: object) : string {
    try {
      return YAML.stringify(data);
    }
    catch (err) {
      throw new SerializationError('Failed to serialize configuration data to YAML');
    }
  }

  // TODO Document thrown `SerializationError` exception via JSDoc.
  /**
   * Deserialize YAML string into object.
   *
   * @param {string} data - YAML string to deserialize.
   *
   * @returns {Object} Deserialized object.
   */
  public toObject(data: string) : object {
    try {
      return YAML.parse(data);
    }
    catch (err) {
      throw new SerializationError('Failed to deserialize configuration data from YAML');
    }
  }

}

export default YamlSerializer;
