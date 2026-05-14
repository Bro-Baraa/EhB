package Enumeratie.App;

public enum Status {

    // enum

    STARTED,
    PAUSED,
    STOPPED,
    UNREACHABLE;

    //method inside enum

    public void run()
    {
        // name() return the name of the enum value

        System.out.println("Status is: " + this.name());
    }


}
