import { StructureType } from "./selectOptions";
import CustomSelect from "../../../../components/CustomForms/NativeBase/CustomSelect/CustomSelect";

const StructureTypeSelect = ({ onChange, isInvalid }) => {
  return (
    <CustomSelect
      items={StructureType}
      label="1. What type of structure is it?"
      onChange={onChange}
      isInvalid={isInvalid}
      testID="myn-report-hazard-page-structure-type-select"
      formControlProps={{
        paddingBottom: 3,
      }}
    />
  );
};

export default StructureTypeSelect;
