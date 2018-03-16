/**
    O(N)이 언제나 O(2N)보다 낫지는 않다
*/
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class O_N_O2N_RunningTimeTest {
	int[] array = new int[100000000];
	
	
	@Test
	public void O_2N() {
		int min = Integer.MIN_VALUE;
		int max = Integer.MAX_VALUE;
		for(int x : array) {
			if(x<min) min = x;
		}
		for(int x : array) {
			if(x>max) max = x;
		}
		System.out.println(min + "/" + max);
//		System.out.println(Integer.MIN_VALUE + "/" + Integer.MAX_VALUE);
	}

	@Test
	public void O_N() {
		int min = Integer.MIN_VALUE;
		int max = Integer.MAX_VALUE;
		for(int x : array) {
			if(x<min) min = x;
			if(x>max) max = x;
		}
		System.out.println(min + "/" + max);
//		System.out.println(Integer.MIN_VALUE + "/" + Integer.MAX_VALUE);
	}

}
