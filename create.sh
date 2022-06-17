#! / bin / bash
TYPE=$1
NAME=$2


# 디렉토리 생성
cd src/components/${TYPE}
mkdir ${NAME}

# index파일 생성
cd ${NAME}
touch ${NAME}.tsx

echo "import React from 'react';
import './${NAME}.scss';

export interface Props {}

const ${NAME}: React.FC<Props> = (props: Props) => {
  return <div></div>;
};

export default ${NAME};
" > ${NAME}.tsx

# 스타일 파일 생성
touch ${NAME}.scss