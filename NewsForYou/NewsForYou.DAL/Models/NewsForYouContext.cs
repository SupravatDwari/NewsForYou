using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace NewsForYou.DAL.Models;

public partial class NewsForYouContext : DbContext
{
    public NewsForYouContext()
    {
    }

    public NewsForYouContext(DbContextOptions<NewsForYouContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agency> Agencies { get; set; }

    public virtual DbSet<AgencyFeed> AgencyFeeds { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=SUPRAVATD-WIN10;Database=NewsForYou;User Id=sa;Password=mindfire;Trust Server Certificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agency>(entity =>
        {
            entity.HasKey(e => e.AgencyId).HasName("PK__Agency__95C546DB48461AE8");

            entity.ToTable("Agency");

            entity.Property(e => e.AgencyLogoPath)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AgencyName)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<AgencyFeed>(entity =>
        {
            entity.HasKey(e => e.AgencyId).HasName("PK__AgencyFe__95C546DBB4E75193");

            entity.ToTable("AgencyFeed");

            entity.Property(e => e.AgencyId).ValueGeneratedNever();
            entity.Property(e => e.AgencyFeedId).ValueGeneratedOnAdd();
            entity.Property(e => e.AgencyFeedUrl)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Agency).WithOne(p => p.AgencyFeed)
                .HasForeignKey<AgencyFeed>(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AgencyFeed_Agency");

            entity.HasOne(d => d.Category).WithMany(p => p.AgencyFeeds)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AgencyFeed_Category");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A0B8B9CFB17");

            entity.ToTable("Category");

            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.HasKey(e => e.NewsId).HasName("PK__News__954EBDF3675AB9CE");

            entity.HasIndex(e => e.NewsLink, "UQ__News__4BEBCC1266834D5F").IsUnique();

            entity.Property(e => e.ClickCount).HasDefaultValue(0);
            entity.Property(e => e.NewsDescription).HasColumnType("text");
            entity.Property(e => e.NewsLink)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NewsPublishDateTime).HasColumnType("datetime");
            entity.Property(e => e.NewsTitle)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Agency).WithMany(p => p.News)
                .HasForeignKey(d => d.AgencyId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__News__AgencyId__4316F928");

            entity.HasOne(d => d.Category).WithMany(p => p.News)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__News__CategoryId__4222D4EF");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserDeta__1788CC4CAC07067D");

            entity.HasIndex(e => e.Email, "UQ__UserDeta__A9D10534486BBE23").IsUnique();

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
