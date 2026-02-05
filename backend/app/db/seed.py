"""
Script to seed initial data for Cineluxor database
Run: python -m app.db.seed
"""
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine, Base
from app.models import *
from app.core.security import get_password_hash

def seed_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Movie).first():
            print("Data already seeded!")
            return
        
        # Seed Movies
        movies = [
            Movie(
                title="Avatar: Fire and Ash",
                description="Hanh trinh moi cua Jake Sully tren hanh tinh Pandora.",
                poster="/images/movie-1.png",
                duration=192,
                rating=9.2,
                age_rating="T13",
                genres="Hanh dong,Sci-Fi",
                badges="IMAX,MOI",
                is_now_showing=True,
                release_date=datetime.now()
            ),
            Movie(
                title="Mission: Impossible 8",
                description="Ethan Hunt doi mat voi nhiem vu nguy hiem nhat.",
                poster="/images/movie-2.png",
                duration=163,
                rating=8.8,
                age_rating="T16",
                genres="Hanh dong,Phieu luu",
                badges="4DX",
                is_now_showing=True,
                release_date=datetime.now()
            ),
            Movie(
                title="Godzilla x Kong: De Che Moi",
                description="Cuoc chien cua cac Titan de bao ve Trai Dat.",
                poster="/images/movie-3.png",
                duration=145,
                rating=8.5,
                age_rating="T13",
                genres="Quai vat,Hanh dong",
                badges="IMAX,4DX",
                is_now_showing=True,
                release_date=datetime.now()
            ),
            Movie(
                title="Mai - Tran Thanh",
                description="Cau chuyen cam dong ve cuoc doi va tinh yeu.",
                poster="/images/movie-4.png",
                duration=131,
                rating=9.0,
                age_rating="T18",
                genres="Tam ly,Tinh cam",
                badges="MOI",
                is_now_showing=True,
                release_date=datetime.now()
            ),
        ]
        db.add_all(movies)
        db.commit()
        print("Seeded movies!")

        # Seed Cinemas
        cinemas = [
            Cinema(
                name="Cineluxor Landmark 81",
                address="Tang 5, Landmark 81, Binh Thanh, TP.HCM",
                city="Ho Chi Minh",
                cinema_type="FLAGSHIP",
                features="IMAX,4DX,Dolby Atmos,VIP Lounge"
            ),
            Cinema(
                name="Cineluxor Times City",
                address="Tang 4, Times City, Hai Ba Trung, Ha Noi",
                city="Ha Noi",
                cinema_type="FLAGSHIP",
                features="IMAX,4DX,ScreenX"
            ),
            Cinema(
                name="Cineluxor Vincom Dong Khoi",
                address="Tang 6, Vincom Center, Quan 1, TP.HCM",
                city="Ho Chi Minh",
                cinema_type="PREMIUM",
                features="Dolby Atmos,VIP Lounge,Premium"
            ),
            Cinema(
                name="Cineluxor Royal City",
                address="Tang 5, Royal City, Thanh Xuan, Ha Noi",
                city="Ha Noi",
                cinema_type="PREMIUM",
                features="4DX,ScreenX,Dolby Atmos"
            ),
        ]
        db.add_all(cinemas)
        db.commit()
        print("Seeded cinemas!")

        # Seed Promotions
        promotions = [
            Promotion(
                code="MONDAY50",
                title="Happy Monday - Giam 50%",
                description="Moi suat chieu thu 2 hang tuan, ap dung cho tat ca loai ve!",
                image="/images/promo-1.png",
                discount_type=DiscountType.PERCENTAGE,
                discount_value=50,
                start_date=datetime.now(),
                end_date=datetime.now() + timedelta(days=365)
            ),
            Promotion(
                code="STUDENT45",
                title="Student Day - Chi 45K",
                description="Thu 4 hang tuan, sinh vien xuat trinh the nhan uu dai!",
                image="/images/promo-2.png",
                discount_type=DiscountType.FIXED,
                discount_value=45000,
                start_date=datetime.now(),
                end_date=datetime.now() + timedelta(days=365)
            ),
            Promotion(
                code="COUPLE299",
                title="Combo Couple - 299K",
                description="2 ve VIP + 1 bap lon + 2 nuoc. Deal hen ho hoan hao!",
                image="/images/promo-3.png",
                discount_type=DiscountType.FIXED,
                discount_value=299000,
                start_date=datetime.now(),
                end_date=datetime.now() + timedelta(days=365)
            ),
            Promotion(
                code="CINELUX20",
                title="Welcome - Giam 20%",
                description="Ma giam gia cho thanh vien moi!",
                discount_type=DiscountType.PERCENTAGE,
                discount_value=20,
                start_date=datetime.now(),
                end_date=datetime.now() + timedelta(days=365)
            ),
        ]
        db.add_all(promotions)
        db.commit()
        print("Seeded promotions!")

        # Seed FnB Items
        fnb_items = [
            FnBItem(
                name="Combo Bap Nuoc",
                description="Bap rang bo lon + Pepsi lon",
                image="/images/fnb-1.png",
                category=FnBCategory.COMBO,
                price=89000
            ),
            FnBItem(
                name="Nachos Pho Mai",
                description="Nachos gion voi sot pho mai dac biet",
                image="/images/fnb-2.png",
                category=FnBCategory.SNACKS,
                price=75000
            ),
            FnBItem(
                name="Hot Dog Combo",
                description="Hot dog thom ngon + Nuoc ngot",
                image="/images/fnb-3.png",
                category=FnBCategory.COMBO,
                price=69000
            ),
            FnBItem(
                name="Tra Sua Premium",
                description="Tra sua tran chau hoac matcha",
                image="/images/fnb-4.png",
                category=FnBCategory.DRINKS,
                price=55000
            ),
        ]
        db.add_all(fnb_items)
        db.commit()
        print("Seeded FnB items!")

        # Seed Demo User
        demo_user = User(
            email="demo@cineluxor.com",
            hashed_password=get_password_hash("demo123"),
            name="Demo User",
            phone="0901234567",
            membership_tier=MembershipTier.GOLD,
            points=1500
        )
        db.add(demo_user)
        db.commit()
        print("Seeded demo user! Email: demo@cineluxor.com, Password: demo123")

        print("\nAll data seeded successfully!")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
