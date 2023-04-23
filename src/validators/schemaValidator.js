
/**
 * Creates a new message validator object
 *
 * @function
 * @param {object} options - The validator options
 * @param {object} options.schemas - The message schemas
 * @param {Array<function>} [options.validationFunctions=[] - The validation functions to apply to each message
 * 
 * @returns {object} A new message validator object
 */
module.exports = ({ schemas, validationFunctions = [], shouldUseDefault = true }) => {
    return {
        /**
         * Validates a message against a specified schema version for a topic
         *
         * @function
         * @param {string} topic - The topic to validate against
         * @param {object} message - The message to validate
         * @param {string} schemaVersion - The schema version to validate against
         * 
         * @returns {boolean} True if the message is valid, false otherwise
         */
        validate: (message) => {
            const {
                event_name: eventName,
                version: schemaVersion
            } = message;

            const arePropertiesDeclared = shouldUseDefault ?
                Object
                    .keys(message)
                    .every(
                        property => {
                            try {
                                return schemas[eventName][schemaVersion][property] != undefined
                            } catch (error) {
                                return false;
                            }
                        }) : true;

            const hasOnlyAllowedProperties = Object.keys(schemas[eventName][schemaVersion]).length == Object.keys(message).length;
            const validatedByCustomValidators = validationFunctions.every((validationFn) => validationFn(topic, message, schemaVersion))

            return arePropertiesDeclared &&
                hasOnlyAllowedProperties &&
                validatedByCustomValidators;
        }
    }
}