import AvatarWidget from "./avatar";
import BadgeWidget from "./badge";
import ButtonWidget from "./button";
import CollapseWidget from "./collapse";
import DivWidget from "./div";
import DrawerWidget from "./drawer";
import HeaderWidget from "./header";
import IconWidget from "./icon";
import ImageWidget from "./image";
import InputWidget from "./input";
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
  MangusHeaderWidget: HeaderWidget,
  MangusAvatarWidget: AvatarWidget,
  MangusBadgeWidget: BadgeWidget,
  MangusCollapseWidget: CollapseWidget,
  MangusDrawerWidget: DrawerWidget,
  MangusInputWidget: InputWidget,
};