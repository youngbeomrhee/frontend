/**
 * Created by whybe on 2018. 3. 21..
 */

function getBigO_ArrayInput(max) {
    let i=2, arrLength=1, arrEleLength=1, bigOList=[{배열원소의개수: 1, 배열의길이:1, bigO:2, 누적:2}], accum=2;
    for(; i<max+1; i++) {
        let bigO=0;
        if(arrLength-arrEleLength<=0) {	// 배열에 더이상 공간이 없을때
            arrLength*=2;	// 배열의 길이를 2배로
            bigO+=1;	// 새로운 배열 생성 O(1);
            bigO+=arrEleLength;	// 배열의 모든 원소를 옮기는 비용 O(N);
        }
        bigO+=1;	// 새로운 원소 삽입 O(1);
        arrEleLength+=1;	// 삽입된 원소의 개수 추가
        accum+=bigO;

        bigOList.push({배열원소의개수: arrEleLength, 배열의길이:arrLength, bigO:bigO, 누적:accum});
    }
    return bigOList;
}

getBigO_ArrayInput(5000);