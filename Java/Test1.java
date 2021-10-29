package Java;
import java.io.*;

class Tester{
    String id;
    String name;
    int amount;

    Tester(String id, String name, int amount){
        this.id = id;
        this.name = name;
        this.amount = amount;
    }

    public String toString(){
        return id + " " + name + " " + amount;
    }
}
public class Test1 {
    public static void main(String[] args) throws IOException{
        File f = new File("booklist.txt");

        // try{
        //     f.createNewFile();
        // }catch(Exception e){
        //     System.out.println(e);
        // }

        FileReader f_Reader = new FileReader(f);
        BufferedReader f_bReader = new BufferedReader(f_Reader);

        String line;
        Tester t;
        while ( (line = f_bReader.readLine()) != null){
            String[] br = line.split(" ");
            t = new Tester(br[0], br[1], Integer.parseInt(br[2]));

            System.out.println(t);
        }

        String[] list = { 
            "C7 LapTrinhC 2", "C8 LapTrinhJava 4"
        };

        FileWriter f_Writer = new FileWriter("booklist.txt");

        for (String e : list )
            f_Writer.write(e + "\n");

        // f_Writer.write("C9 LapTrinhPython 4");

        f_Writer.close();
        
    }
}
