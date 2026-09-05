import Joi from "joi";

const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Must be a valid MongoDB ObjectId",
  });

const time = Joi.string()
  .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
  .messages({
    "string.pattern.base": "Time must be in HH:mm format",
  });

const vehicleTypes = ["bus", "van", "coaster", "car", "other"];

const statuses = ["active", "inactive", "maintenance"];

export const createTransportValidation = Joi.object({
  schoolId: objectId.required().messages({
    "any.required": "School ID is required",
  }),

  academicYearId: objectId.required().messages({
    "any.required": "Academic Year ID is required",
  }),

  vehicleNumber: Joi.string()
    .trim()
    .uppercase()
    .max(50)
    .required()
    .messages({
      "any.required": "Vehicle number is required",
    }),

  vehicleType: Joi.string()
    .valid(...vehicleTypes)
    .required()
    .messages({
      "any.required": "Vehicle type is required",
      "any.only": "Invalid vehicle type",
    }),

  routeName: Joi.string()
    .trim()
    .max(150)
    .required()
    .messages({
      "any.required": "Route name is required",
    }),

  driverName: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      "any.required": "Driver name is required",
    }),

  driverPhone: Joi.string()
    .trim()
    .max(20)
    .required()
    .messages({
      "any.required": "Driver phone is required",
    }),

  pickupTime: time.required().messages({
    "any.required": "Pickup time is required",
  }),

  dropoffTime: time.required().messages({
    "any.required": "Drop-off time is required",
  }),

  monthlyFee: Joi.number().min(0).default(0),

  capacity: Joi.number().integer().min(1).required().messages({
    "any.required": "Vehicle capacity is required",
    "number.min": "Vehicle capacity must be at least 1",
  }),

  status: Joi.string()
    .valid(...statuses)
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  createdBy: objectId.optional(),

  updatedBy: objectId.optional(),
});

export const updateTransportValidation = Joi.object({
  schoolId: objectId.optional(),

  academicYearId: objectId.optional(),

  vehicleNumber: Joi.string()
    .trim()
    .uppercase()
    .max(50)
    .optional(),

  vehicleType: Joi.string()
    .valid(...vehicleTypes)
    .optional(),

  routeName: Joi.string()
    .trim()
    .max(150)
    .optional(),

  driverName: Joi.string()
    .trim()
    .max(100)
    .optional(),

  driverPhone: Joi.string()
    .trim()
    .max(20)
    .optional(),

  pickupTime: time.optional(),

  dropoffTime: time.optional(),

  monthlyFee: Joi.number().min(0).optional(),

  capacity: Joi.number().integer().min(1).optional(),

  status: Joi.string()
    .valid(...statuses)
    .optional(),

  remarks: Joi.string().trim().max(500).allow("").optional(),

  updatedBy: objectId.optional(),
}).min(1);