using System;
using System.Collections.Generic;

namespace NewsForYou.DAL.Models;

public partial class AgencyFeed
{
    public int AgencyFeedId { get; set; }

    public string AgencyFeedUrl { get; set; } = null!;

    public int AgencyId { get; set; }

    public int CategoryId { get; set; }

    public virtual Agency Agency { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;
}
