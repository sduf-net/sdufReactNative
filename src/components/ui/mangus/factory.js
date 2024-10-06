import AvatarWidget from "./avatar";
import BadgeWidget from "./badge";
import ButtonWidget from "./button";
import CollapseWidget from "./collapse";
import DivWidget from "./div";
import FabWidget from "./fab";
import HeaderWidget from "./header";
import IconWidget from "./icon";
import ImageWidget from "./image";
import TextWidget from "./text";
import ToggleWidget from "./toggle";

export const mangusToComponentMap = {
  // widgets
  MangusButtonWidget: ButtonWidget,
  MangusImageWidget: ImageWidget,
  MangusIconWidget: IconWidget,
  MangusDivWidget: DivWidget,
  MangusToggleWidget: ToggleWidget,
  MangusTextWidget: TextWidget,
  MangusFabWidget: FabWidget,
  MangusHeaderWidget: HeaderWidget,
  MangusAvatarWidget: AvatarWidget,
  MangusBadgeWidget: BadgeWidget,
  MangusCollapseWidget: CollapseWidget,
};