import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { captionText } from '@/styles/typography';

export const ListLabelBar = styled.div`
  display: grid;
  grid-template-columns: 70px 190px minmax(80px, 1fr) minmax(180px, 2.4fr) 80px;
  width: 100%;
  padding: 8px 20px;
  color: #a0a0a0;
  background-color: #ffffff;
  box-sizing: border-box;
  border-bottom: 0.5px solid #efefef;

  ${theme.media.mobile} {
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
    padding: 8px 10px;
  }
`;

export const ListLabel = styled.span`
  min-width: 0;

  &:nth-of-type(2) {
    color: #000;
  }

  ${theme.media.mobile} {
    &:nth-of-type(1) {
      grid-column: 1;
    }

    &:nth-of-type(2) {
      grid-column: 2;
    }

    &:nth-of-type(3) {
      grid-column: 3;
    }

    &:nth-of-type(4) {
      grid-column: 4 / span 3;
    }

    &:nth-of-type(5) {
      grid-column: 7;
    }
  }
`;

export const TableWrapper = styled.article`
  width: 100%;
  overflow: visible;
  flex: none;
  position: relative;
  z-index: 0;
`;

export const StoreTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  ${theme.media.mobile} {
    display: block;
    width: 100%;
  }
`;

export const TableHeader = styled.thead`
  display: none;
`;

export const TableHeaderCell = styled.th`
  padding: 8px 20px;
  text-align: left;
  font-weight: 400;
  color: #a0a0a0;
  white-space: nowrap;

  ${theme.media.mobile} {
    padding: 8px 0;
  }
`;

export const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;

export const SortIcon = styled('img', {
  shouldForwardProp: (prop) => prop !== '$asc',
})`
  width: 6.3px;
  height: 7px;
  display: block;
  transform: ${(props) => (props.$asc ? 'none' : 'rotate(180deg)')};
`;

export const TableHeaderCellBookmark = styled.th`
  width: 28px;
  padding: 8px 0;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const TableBody = styled.tbody`
  ${theme.media.mobile} {
    display: block;
  }
`;

export const StatusRow = styled.tr`
  ${theme.media.mobile} {
    display: block;
    padding: 20px 10px;

    td {
      display: block;
      width: 100%;
    }
  }
`;

export const TableRow = styled('tr', {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})`
  border-top: 0.5px solid #efefef;
  background-color: ${(props) => (props.isHovered ? '#f9f9f9' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }

  ${theme.media.mobile} {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
    padding: 10px;
    align-items: start;
    min-height: 52px;
  }
`;

export const TableCell = styled.td`
  padding: 10px 20px;
  vertical-align: top;
  color: #000;

  ${theme.media.mobile} {
    display: block;
    padding: 0;
    width: auto;
  }
`;

export const LabelCell = styled(TableCell)`
  width: 70px;
  ${captionText}

  ${theme.media.mobile} {
    width: auto;
    grid-column: 1;
  }
`;

export const BookmarkCell = styled(TableCell)`
  width: 28px;
  padding: 10px 0 10px 12px;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const BookmarkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const BookmarkIcon = styled.span`
  color: ${(props) => (props.isBookmarked ? '#111' : '#ccc')};
`;

export const TitleCell = styled(TableCell)`
  width: 190px;

  ${theme.media.mobile} {
    width: auto;
    grid-column: 2;
    min-width: 0;
  }
`;

export const Name = styled.div`
  font-weight: 400;
`;

export const IndustryCell = styled(TableCell)`
  ${theme.media.mobile} {
    grid-column: 3;
    min-width: 0;
  }
`;

export const Industry = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  color: #a0a0a0;
  ${captionText}
`;

export const Line = styled.div`
  display: none;
`;

export const KeywordCell = styled(TableCell)`
  max-width: 420px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${theme.media.mobile} {
    max-width: none;
    overflow: visible;
    text-overflow: unset;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    grid-column: 4 / span 3;
  }
`;

export const ContactCell = styled(TableCell)`
  width: 80px;

  ${theme.media.mobile} {
    width: auto;
    padding-right: 0;
    grid-column: 7;
    min-width: 0;
  }
`;
