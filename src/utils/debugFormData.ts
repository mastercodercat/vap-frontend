// Utility to debug FormData contents
export const debugFormData = (formData: FormData) => {
  console.log("=== FormData Debug ===");
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      });
    } else {
      console.log(`${key}:`, value);
    }
  }
  console.log("=== End FormData Debug ===");
};

// Utility to check if FormData is properly constructed
export const validateFormData = (
  formData: FormData,
  expectedFields: string[]
) => {
  const actualFields = Array.from(formData.keys());
  const missingFields = expectedFields.filter(
    (field) => !actualFields.includes(field)
  );

  if (missingFields.length > 0) {
    console.error("Missing fields in FormData:", missingFields);
    return false;
  }

  console.log("FormData validation passed. Fields:", actualFields);
  return true;
};
