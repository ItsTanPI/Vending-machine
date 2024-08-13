var dataToSend = 
{
    Type: null,
    Number: null,
    OTP: null,
    NEWPASS: null
};

function ajax(dataToSend) 
{
    return new Promise((resolve, reject) => 
    {
        $.ajax(
        {
            url: '../PHP/OTP.php',
            method: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(response) 
            {
                resolve(response); 
            },
            error: function(xhr, status, error) 
            {
                console.error(xhr.responseText);
                reject(error);
            }
        });
    });
}

var numberopen = true;
var OTPopen = false;
var pnoumber;

$(document).ready(async function()
{
    $("#numberBox").show();
    $("#OTPBox").hide();
    $("#EnterOTP").hide();

    $("#SendOTP").click(async function () 
    {
        dataToSend.Type = "SendOTP";
        if(($("#PhoneNum").val()).length != 10 || ($("#PhoneNum").val()).charAt(0) == '0')
        {
            $("#LogInLog").show();
            $("#LogInLog").css("color", "Red");
            $("#LogInLog").html("Invalid Input");
            return;
        }


        dataToSend.Number = String($("#PhoneNum").val());
        pnoumber = String($("#PhoneNum").val());
        var obj = await ajax(dataToSend);
        console.log(obj);
        if (obj.Type == "Success") 
        {
            $("#EnterOTP").show();
            $("#LogInLog").show();
            $("#LogInLog").css("color", "Green");
            $("#LogInLog").html(obj.Type);
            return;
        }
        else
        {
            $("#LogInLog").show();
            $("#LogInLog").css("color", "Red");
            $("#LogInLog").html(obj.Type);
            return;
        }
    });

    $("#EnterOTP").click (async function()
    {
        $("#numberBox").hide();
        $("#OTPBox").show();
    });

    $("#PassUpdate").click(async function () 
    {
        var pass = $("#pass1").val() + $("#pass2").val() + $("#pass3").val() + $("#pass4").val();
        var OTP = $("#OTP1").val() + $("#OTP2").val() + $("#OTP3").val() + $("#OTP4").val() + $("#OTP5").val();


        if(pass.length != 4 || Number.isNaN(parseInt(pass)) || OTP.length != 5 || Number.isNaN(parseInt(OTP)))
        {
            $("#OTPTextLable").show();
            $("#OTPTextLable").css("color", "Red");
            $("#OTPTextLable").html("Invalid Input");
            return;
        }

        dataToSend.Type = "Verfiy"
        dataToSend.Number = pnoumber;
        dataToSend.OTP = OTP;
        dataToSend.NEWPASS = pass;
        
        var obj = await ajax(dataToSend);
        console.log(obj);


        $("#OTPTextLable").show();
        $("#OTPTextLable").css("color", "Red");
        
        if (obj.Type == "Done :)") 
        {
            $("#OTPTextLable").css("color", "green");
            $("#PassUpdate").hide();
            $("#Backkk").show();
        }
        $("#OTPTextLable").html(obj.Type);
    });

});

