//
//  ContentView.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        var authenticated: Bool = true;
        
        if(authenticated) {
            TabView() {
                        NavigationStack() {
                            HomePage()
                        }
                        .tabItem {
                            Text("Home")
                            Image(systemName: "house.fill")
                                .renderingMode(.template)
                        }
                
                        NavigationStack() {
                            AuthenticationPage()
                        }
                        .tabItem {
                            Text("Authentication")
                            Image(systemName: "faceid")

                        }
                        .badge(1)
                        
                        NavigationStack() {
                            ProfilePage()
                        }
                        .tabItem {
                            Label("Profile", systemImage: "person.crop.circle")
                        }
            }
            
        } else {
            LogInPage()
        }
        
    }
}

#Preview {
    ContentView()
}
