using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class UserDetail
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}
