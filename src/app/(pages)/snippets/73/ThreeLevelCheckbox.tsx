'use client';

import React, { useState } from "react";
import MasterCheckbox from "./MasterCheckbox";
import SellerCheckbox from "./SellerCheckbox";
import { Seller, CheckedMap } from "./types";

// 예시 data
const sellers: Seller[] = [
  {
    id: "s1",
    name: "셀러A",
    products: [
      { id: "p1", name: "상품1" },
      { id: "p2", name: "상품2" },
    ],
  },
  {
    id: "s2",
    name: "셀러B",
    products: [
      { id: "p3", name: "상품3" },
      { id: "p4", name: "상품4" },
    ],
  },
];

// 체크 상태 초기화 함수
const getInitialCheckedMap = (data: Seller[]): CheckedMap => {
  const map: CheckedMap = {};
  data.forEach(seller => {
    map[seller.id] = {};
    seller.products.forEach(product => {
      map[seller.id][product.id] = false;
    });
  });
  return map;
};

const ThreeLevelCheckbox: React.FC = () => {
  const [checkedMap, setCheckedMap] = useState<CheckedMap>(
    () => getInitialCheckedMap(sellers)
  );

  // 최상위 체크박스: 모든 상품이 체크되면 true
  const isAllChecked = sellers.every(seller =>
    seller.products.every(p => checkedMap[seller.id][p.id])
  );

  // 전체 제어 (최상위)
  const handleMasterChange = (checked: boolean) => {
    const newMap: CheckedMap = {};
    sellers.forEach(seller => {
      newMap[seller.id] = {};
      seller.products.forEach(product => {
        newMap[seller.id][product.id] = checked;
      });
    });
    setCheckedMap(newMap);
  };

  // 셀러 단위 체크제어
  const handleSellerChange = (sellerId: string, checked: boolean) => {
    setCheckedMap(prev => ({
      ...prev,
      [sellerId]: Object.fromEntries(
        Object.entries(prev[sellerId]).map(([pid]) => [pid, checked])
      ),
    }));
  };

  // 상품 단위 체크제어
  const handleProductChange = (
    sellerId: string,
    productId: string,
    checked: boolean
  ) => {
    setCheckedMap(prev => ({
      ...prev,
      [sellerId]: {
        ...prev[sellerId],
        [productId]: checked,
      },
    }));
  };

  // 셀러 체크박스: 하위 상품 모두 체크된 경우에만 선택됨
  const isSellerChecked = (seller: Seller) =>
    seller.products.every(p => checkedMap[seller.id][p.id]);

  return (
    <div>
      <MasterCheckbox checked={isAllChecked} onChange={handleMasterChange} />
      {sellers.map(seller => (
        <SellerCheckbox
          key={seller.id}
          seller={seller}
          checked={isSellerChecked(seller)}
          onChange={checked => handleSellerChange(seller.id, checked)}
          checkedMap={checkedMap}
          onProductChange={(productId, checked) =>
            handleProductChange(seller.id, productId, checked)
          }
        />
      ))}
    </div>
  );
};

export default ThreeLevelCheckbox;