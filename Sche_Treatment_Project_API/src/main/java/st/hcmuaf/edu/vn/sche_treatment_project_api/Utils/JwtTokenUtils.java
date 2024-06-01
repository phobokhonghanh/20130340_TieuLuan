package st.hcmuaf.edu.vn.sche_treatment_project_api.Utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import st.hcmuaf.edu.vn.sche_treatment_project_api.model.Account;
import io.jsonwebtoken.io.Decoders;

import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtils {
    @Value("${jwt.expiration}")
    private int expiration; //save to an environment variable

    @Value("${jwt.expiration-refresh-token}")
    private int expirationRefreshToken;

    @Value("${jwt.secretKey}")
    private String secretKey;
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtils.class);

    public String generateToken(Account account) {
        //properties => claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("accountPhone", account.getAccountPhone());
        claims.put("accountId", account.getId());
        try {
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(account.getAccountPhone())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                    .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                    .compact();
            return token;
        } catch (Exception e) {
            logger.error("Cannot create jwt token, error: " + e.getMessage());
            return null;
        }
    }

    private Key getSignInKey() {
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        //Keys.hmacShaKeyFor(Decoders.BASE64.decode("TaqlmGv1iEDMRiFp/pHuID1+T84IABfuA0xXh4GhiUI="));
        return Keys.hmacShaKeyFor(bytes);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = this.extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //check expiration
    public boolean isTokenExpired(String token) {
        Date expirationDate = this.extractClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    public String extractPhoneNumber(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Invalid JWT expired {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Invalid JWT unsupported {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Invalid JWT empty {}", e.getMessage());
        }
        return false;
    }
}
