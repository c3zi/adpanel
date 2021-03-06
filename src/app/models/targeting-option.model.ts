interface TargetingOption {
  id?: string;
  key: string;
  label: string;
  valueType: string;
  allowInput: boolean;

  children?: TargetingOption[];
  values?: TargetingOptionValue[];
}

interface TargetingOptionValue {
  id: string;
  label: string;
  value: string;
  parent: Partial<TargetingOption>;

  selected?: boolean;
  allowInput?: boolean;
  isCustom?: boolean;
}

interface AssetTargeting {
  requires: TargetingOptionValue[];
  excludes: TargetingOptionValue[];
}

export { TargetingOption, TargetingOptionValue, AssetTargeting };
