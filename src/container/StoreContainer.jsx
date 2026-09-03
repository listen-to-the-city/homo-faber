'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import StoreList from '@/components/store/StoreList';
import { useStores, useStoreFilters } from '@/hooks/useStores';
import { getStoreTypes } from '@/utils/api/stores-api';
import { convertIndustryNameToKorean, convertMaterialNameToKorean } from '@/utils/converters';
import * as S from '@/styles/store/storeContainer.style';
import * as ListS from '@/styles/store/storeList.style';

function StoreContainer() {
  const pathname = usePathname();
  const { stores, isLoading, isLoadingMore, error, hasMore, loadMore } = useStores();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState({
    industry: [],
    capacity: [],
    material: [],
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [allTags, setAllTags] = useState({
    industry: [],
    capacity: [],
    material: [],
  });

  const filteredStores = useStoreFilters(stores, searchKeyword, selectedTags, sortBy);
  const chromeRef = useRef(null);
  const hasDetail = pathname?.startsWith('/store/') && pathname !== '/store';

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return undefined;

    const updateChrome = () => {
      const bottom = `${Math.round(el.getBoundingClientRect().bottom)}px`;
      document.documentElement.style.setProperty('--store-chrome-bottom', bottom);
    };

    updateChrome();
    const observer = new ResizeObserver(updateChrome);
    observer.observe(el);
    window.addEventListener('resize', updateChrome);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateChrome);
    };
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const types = await getStoreTypes();
        setAllTags({
          industry: types.industryTypes?.map((t) => t.name) || [],
          capacity: types.capacityTypes?.map((t) => t.name) || [],
          material: types.materialTypes?.map((t) => t.name) || [],
        });
      } catch (err) {
        console.error('태그 목록 가져오기 실패:', err);
      }
    };
    fetchTags();
  }, []);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setSelectedTags((prev) => ({
      ...prev,
      industry: value ? [value] : [],
    }));
  };

  const handleTagClick = (tagType, tagName) => {
    setSelectedTags((prev) => {
      if (tagType === 'material' && prev.material.includes(tagName)) {
        return prev;
      }
      const current = prev[tagType];
      const next = current.includes(tagName)
        ? current.filter((tag) => tag !== tagName)
        : [...current, tagName];
      return { ...prev, [tagType]: next };
    });
  };

  const clearMaterialTags = () => {
    setSelectedTags((prev) => ({
      ...prev,
      material: [],
    }));
  };

  const toggleCapacity = () => {
    handleTagClick('capacity', '소량 생산');
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const shouldUseInfiniteScroll =
    !searchKeyword &&
    selectedTags.industry.length === 0 &&
    selectedTags.capacity.length === 0 &&
    selectedTags.material.length === 0;

  return (
    <S.StoreWrapper hasDetail={hasDetail}>
      <S.StoreChrome ref={chromeRef}>
      <S.StoreToolbar>
        <S.SearchRow>
        <S.SearchField>
          <S.SearchLabel>검색</S.SearchLabel>
          <S.SearchInput
            type="search"
            value={searchKeyword}
            onChange={handleSearch}
            placeholder="Type to search..."
          />
        </S.SearchField>

        <S.FieldSelect>
          <S.SearchLabel>분야</S.SearchLabel>
          <S.IndustrySelect
            value={selectedTags.industry[0] || ''}
            onChange={handleIndustryChange}
          >
            <option value="">전체</option>
            {allTags.industry.map((tag) => (
              <option key={tag} value={tag}>
                {convertIndustryNameToKorean(tag)}
              </option>
            ))}
          </S.IndustrySelect>
          <S.SelectChevron src="/img/icons/icon-chevron-down.svg" alt="" />
        </S.FieldSelect>
        </S.SearchRow>

        <S.TagPanel>
          <S.TagRow>
            <S.TagItems>
              <S.TagLegend>취급 품목:</S.TagLegend>
              {allTags.material.map((tag) => (
                <S.Tag
                  key={tag}
                  type="button"
                  active={selectedTags.material.includes(tag)}
                  onClick={() => handleTagClick('material', tag)}
                >
                  {convertMaterialNameToKorean(tag)}
                </S.Tag>
              ))}
              <S.CapacityNote
                type="button"
                active={selectedTags.capacity.includes('소량 생산')}
                onClick={toggleCapacity}
              >
                개인 및 학생 작업 가능
              </S.CapacityNote>
            </S.TagItems>
            {selectedTags.material.length > 0 && (
              <S.TagClearButton
                type="button"
                aria-label="취급 품목 필터 초기화"
                onClick={clearMaterialTags}
              >
                <svg viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </S.TagClearButton>
            )}
          </S.TagRow>
        </S.TagPanel>
      </S.StoreToolbar>
      <ListS.ListLabelBar>
        <ListS.ListLabel>라벨</ListS.ListLabel>
        <ListS.ListLabel>
          <ListS.SortButton
            type="button"
            onClick={() => handleSortChange(sortBy === 'nameAsc' ? 'nameDesc' : 'nameAsc')}
          >
            이름
            <ListS.SortIcon
              src="/img/icons/icon-sort.svg"
              alt=""
              $asc={sortBy === 'nameAsc'}
            />
          </ListS.SortButton>
        </ListS.ListLabel>
        <ListS.ListLabel>분야</ListS.ListLabel>
        <ListS.ListLabel>취급 품목</ListS.ListLabel>
        <ListS.ListLabel>리뷰</ListS.ListLabel>
      </ListS.ListLabelBar>
      </S.StoreChrome>

      <StoreList
        stores={filteredStores}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={shouldUseInfiniteScroll ? hasMore : false}
        onLoadMore={shouldUseInfiniteScroll ? loadMore : undefined}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
    </S.StoreWrapper>
  );
}

export default StoreContainer;
