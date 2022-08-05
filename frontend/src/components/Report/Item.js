import { Menu } from "antd";

export const menu = (handleDataFetching, dropdownCategories, selectedItem) => {
  return (
    <Menu
      items={dropdownCategories.map((item) => {
        return (
          selectedItem.key != item.key && {
            label: item.content,
            key: item.key,
            onClick: (e) => handleDataFetching(e.key, item.period),
          }
        );
      })}
    />
  );
};
