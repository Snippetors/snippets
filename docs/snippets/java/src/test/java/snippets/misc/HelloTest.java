package snippets.misc;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import snippets.misc.Hello;

public class HelloTest {
    Hello hello;

    @Test
    void helloTest() {
        Hello.hello();
        Assertions.assertNull(hello);
    }
}
